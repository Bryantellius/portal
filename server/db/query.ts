import * as mysql from "mysql";
import config from "../config";

const connection = mysql.createPool(config.mysql);

const Query = async (query: string, values?: Array<any>) => {
  const queryPromise = new Promise((resolve, reject) => {
    connection.query(query, values, (err: Error, results: JSON) => {
      if (err) {
        reject(err);
      }
      resolve(results);
    });
  });

  const results = await queryPromise;
  return [].slice.call(results, 0)
};

const QuerySingle = async (query: string, values?: Array<any>) => {
  let results = [].slice.call(await Query(query, values), 0);
  
  return results.length > 0
    ? results[0]
    : [];
}

export {
  QuerySingle
};

export default Query;