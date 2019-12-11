import json
from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Amit_1998'
app.config['MYSQL_DB'] = 'library'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

#Librarian
@app.route('/add-category',methods=["POST"])
def addCategory():
    category_name = request.json["category_name"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO category(category_name) VALUES (%s) """, [category_name])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")
    
@app.route('/add-publisher',methods=["POST"])
def addPublisher():
    publisher_name = request.json["publisher_name"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO publisher(publisher_name) VALUES (%s) """, [publisher_name])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/add-author',methods=["POST"])
def addAuthor():
    author_name = request.json["author_name"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO author(author_name) VALUES (%s) """, [author_name])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/add-book',methods=["POST"])
def addBook():
    book_name = request.json["book_name"]
    publisher_id = request.json["publisher_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO books(book_name,publisher_id) VALUES (%s,%s) """, [book_name,publisher_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/add-author-to-book/<int:book_id>',methods=["POST"])
def addAuthorToBook(book_id):
    author_id = request.json["author_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO author_book(book_id,author_id) VALUES (%s,%s) """, [book_id,author_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")
    
@app.route('/add-category-to-book/<int:book_id>',methods=["POST"])
def addCategoryToBook(book_id):
    category_id = request.json["category_id"]
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO category_book(book_id,category_id) VALUES (%s,%s) """, [book_id,category_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Added Successfully")

@app.route('/getBooks')
def getBooks():
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from books order by book_id desc""")
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/getPublisher')
def getPublisher():
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from publisher order by publisher_name""")
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/getCategory')
def getCategory():
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from category order by category_name asc""")
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/getAuthor')
def getAuthor():
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from author order by author_name asc""")
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book-authors/<int:book_id>')
def getBookAuthors(book_id):
    cursor = mysql.connection.cursor()
    cursor.execute(""" select author_name,book_id,map_id from author_book natural join author where book_id =(%s)""",[book_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book-categories/<int:book_id>')
def getBookCategories(book_id):
    cursor = mysql.connection.cursor()
    cursor.execute(""" select category_name,book_id,map_id from category_book natural join category where book_id =(%s)""",[book_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book/<int:book_id>')
def getBook(book_id):
    cursor = mysql.connection.cursor()
    cursor.execute(""" select book_name,book_id,publisher_name from books join publisher on books.publisher_id = publisher.publisher_id where book_id =(%s)""",[book_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/delete-author-book/<int:map_id>',methods=["DELETE"])
def deleteAuthorBook(map_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""delete from author_book where map_id =(%s)""",[map_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Delete Successfully")

@app.route('/delete-category-book/<int:map_id>',methods=["DELETE"])
def deleteCategoryBook(map_id):
    cursor = mysql.connection.cursor()
    cursor.execute("""delete from category_book where map_id =(%s)""",[map_id])
    mysql.connection.commit()
    cursor.close()
    return json.dumps("Delete Successfully")

#Students
@app.route('/get-book-by-name/<book_name>')
def getBookByName(book_name):  
    print(book_name)
    cursor = mysql.connection.cursor()
    book_name1 = str(book_name)
    search_string= f"%{book_name}%"
    cursor.execute(""" select * from books where book_name like (%s) """,[search_string])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book-by-category/<int:category_id>')
def getBookByCategories(category_id): 
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from books a natural join category_book  where category_id = (%s) """,[category_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book-by-author/<int:author_id>')
def getBookByAuthor(author_id): 
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from books a natural join author_book where author_id =(%s) """,[author_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)

@app.route('/get-book-by-publisher/<int:publisher_id>')
def getBookByPublisher(publisher_id):  
    cursor = mysql.connection.cursor()
    cursor.execute(""" select * from books where publisher_id =(%s) """,[publisher_id])
    result = cursor.fetchall()
    mysql.connection.commit()
    cursor.close()
    return json.dumps(result)


if __name__ == "__main__":
    app.run(debug = True)
