"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");


class Product {

  static async create({ name, description, count_in_stock, price, imgUrl }) {
    const result = await db.query(
      `INSERT INTO products
       (name, description, count_in_stock, price, img_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, description, count_in_stock, price, img_url`,
      [name, description, count_in_stock, price, imgUrl]
    );
    const { id, ...product } = result.rows[0];
    return { id, ...product, imgUrl };
  }
  static async updateProduct({ id, name, description, count_in_stock, price, imgUrl }) {
    const result = await db.query(
      `UPDATE products
      SET name = $1, description = $2, count_in_stock = $3, price = $4, img_url = $5
      WHERE id = $6
      RETURNING id, name, description, count_in_stock, price, img_url AS "imgUrl"`,
      [name, description, count_in_stock, price, imgUrl, id]
    );
    const product = result.rows[0];
    return product;
  }

  static async deleteProduct(id) {
    const result = await db.query(
      `DELETE FROM products
      WHERE id = $1
      RETURNING id`,
      [id]
    );
    const deletedProductId = result.rows[0].id;
    return deletedProductId;
  }

  static async get(id) {
    const productRes = await db.query(
          `SELECT id,
                name, 
                description, 
                count_in_stock, 
                price, 
                img_url AS "imgUrl"
           FROM products
           WHERE id = $1`,
        [id]);

    const product = productRes.rows[0];

    return product;
  }
  static async getCommentsForProducts(id) {
    const productRes = await db.query(
          `SELECT id,
                comment, 
                username, 
                product_id
           FROM comments
           WHERE product_id = $1`,
        [id]);

    const comment = productRes.rows;
    return comment;
  }
  static async getSavedProducts(username) {
    const productRes = await db.query(
          `SELECT p.id, p.name, p.count_in_stock, p.price, p.description, p.img_url
          FROM products p
          JOIN saved s ON s.product_id = p.id
          JOIN users u ON s.username = u.username
          WHERE u.username = $1;`,
        [username]);

    const saved = productRes.rows;
    return saved;
  }
  static async saveProduct(id, username) {
    const productRes = await db.query(
          `INSERT INTO saved
                (username,
                product_id)
           VALUES ($1, $2)
           `,
        [username, id]);

    const Productcomment = productRes.rows;

    return Productcomment;
  }

  static async addCommentsForProducts(id, {username,comment}) {
    const productRes = await db.query(
          `INSERT INTO comments
                (comment,
                  username,
                product_id)
           VALUES ($1, $2, $3)
           RETURNING comment`,
        [comment, username, id]);

    const Productcomment = productRes.rows;

    return Productcomment;
  }

  static async deleteComment(productId, commentId) {
    const result = await db.query(
      `DELETE FROM comments 
      WHERE product_id = $1 
      AND id = $2 
      RETURNING id`,
      [productId, commentId]
    );
    const deletedComment = result.rows[0];
    if (!deletedComment) throw new NotFoundError(`Comment not found`);
  }

  static async findAll() {
    const productRes = await db.query(
          `SELECT 
                id,
                name, 
                description, 
                count_in_stock, 
                price, 
                img_url AS "imgUrl"
           FROM products`);

    return productRes.rows;
  }


  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM products
           WHERE id = $1
           RETURNING id,
                      name`,
        [id]);
    const productRes = result.rows[0];

    if (!productRes) throw new NotFoundError(`No product: ${result.name}`);
  }
}

module.exports = Product;