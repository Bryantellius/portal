import * as mysql from "mysql";
import config from "../../config";

const connection = mysql.createPool(config.mysql);

const Query = (query: string, values?: Array<any>) => {
  return new Promise((resolve, reject) => {
    connection.query(query, values, (err: Error, results: JSON) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });
};

export default Query;
