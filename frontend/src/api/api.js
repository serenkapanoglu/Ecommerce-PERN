import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Lipsticks {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    let headers ={};
    const url = `${BASE_URL}/${endpoint}`;
    const params = (method === "get")
        ? data
        : {};

        if(!endpoint.includes('auth')){
          headers = { Authorization: `Bearer ${Lipsticks.token}` };
        }
    try {
      return (await axios({ url, method, data, params,headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
      
      
    }
  }

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }
  static async getProducts(){
    let res = await this.request(`products`)
    return res.products;
  }
  static async getSavedProducts(username){
    let res = await this.request(`products/${username}/saved`)
    return res.products;
  }
  static async saveProduct(id, username, data){
    let res = await this.request(`products/${id}/${username}/saved`,data,"post")
    return res.products;
  }

  static async getProduct(id){
    let res = await this.request(`products/${id}`)
    console.log('asksksksl');
    return res.products;
  }
  
  static async addProduct(data){
    let res = await this.request(`products`, data, "post")
    return res.product;
  }
  static async deleteProduct(id, data){
    let res = await this.request(`products/${id}`, data, "delete")
    return res.product;
  }
  static async updateProduct(id, data){
    let res = await this.request(`products/${id}`, data, "patch")
    return res.product;
  }

  static async addProductComment(id, data){
    let res = await this.request(`products/${id}/comments`, data, "post")
    return res.comment;
  }
  static async getProductComment(id){
    let res = await this.request(`products/${id}/comments`)
    return res.comments;
  }
  static async deleteProductComment(id, commentId, data){
    let res = await this.request(`products/${id}/comments/${commentId}`, data, "delete")
    return res.comment;
  }
}
export default Lipsticks;