import config from '../globals/config';

class RestAPI {
  static async getData() {
    try {
      const response = await fetch(`${config.BASE_URL}/list`);
      const responseJson = await response.json();
      if (responseJson.error) {
        console.log('error get Data');
        return [];
      }
      return responseJson.restaurants;
    } catch (error) {
      console.log('error catch');
      return [];
    }
  }

  static async detail(id) {
    try {
      const response = await fetch(`${config.BASE_URL}/detail/${id}`);
      const responseJson = await response.json();
      if (responseJson.error) {
        console.log('error get Data');
        return [];
      }
      return responseJson.restaurant;
    } catch (error) {
      console.log('error catch');
      return [];
    }
  }
}

export default RestAPI;
