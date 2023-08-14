const db = require('../util/database');

module.exports = class Grocery {
  constructor(id, item) {
    this.id = id;
    this.item = item;
    this.nombre=nombre;

  }

  static fetchAll() {
    return db.execute('SELECT * FROM items');
  }

  static post(item) {
    console.log(item)   
   
            // let sql = `insert into dispositivos(nombre,codigo) values('${nombre}','${codigo}' )`;   
         return db.execute('INSERT INTO items (item,nombre) VALUES (?,?)', [item.item,item.nombre]); 
         }

  static update(id, item) {

     console.log(item)
    return db.execute('UPDATE items SET item = ?, nombre = ? WHERE id = ?', [item.item,item.nombre, id]);
  }

  static delete(id) {
    return db.execute('DELETE FROM items WHERE id = ?', [id]);
  }
};
