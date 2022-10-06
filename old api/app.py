from decouple import config
from flask import Flask, request, jsonify, Response, Blueprint

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


# Database configuration
DB_USER=config("DB_USER")
DB_PASS=config("DB_PASS")
DB_URL =config("DB_URL")
DB_PORT =config("DB_PORT")
DB_SCHEMA = config("DB_SCHEMA")
DB_URI = f"mariadb+mariadbconnector://{DB_USER}:{DB_PASS}@{DB_URL}:{DB_PORT}/{DB_SCHEMA}"


app = Flask(__name__) 


#Indicamos la configuracion y asociamos la url para que se conecte hacia la base de datos
app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI

#Para evitar un rastreo de cada cambio
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Inicializacion del objeto db de SQLAlchemy
db = SQLAlchemy(app)

#Inicializacion del objeto ma de flask-marshmallow
ma = Marshmallow(app)


#Modelos Base de datos
class Usuario(db.Model): 
    __tablename__ = 'usuario'
    usuario_id = db.Column(db.String(50), primary_key = True, unique=True, nullable=False)
    public_id = db.Column(db.String(50), nullable=False, unique=True)
    es_tutor = db.Column(db.Boolean, default=False)
    descripcion = db.Column(db.String(200))
    tutorias = db.relationship("Tutoria", backref="usuarios")

    def __init__(self, usuario_id, public_id, es_tutor=False, descripcion=None):
        self.usuario_id = usuario_id
        self.public_id = public_id
        self.es_tutor = es_tutor
        self.descripcion = descripcion

class Categoria(db.Model): 
    __tablename__ = 'categoria'
    cat_id = db.Column(db.String(50), primary_key = True, unique=True, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    sub_categorias = db.relationship("SubCategoria", backref="categorias_s")
    tutorias = db.relationship("Tutoria", backref="categorias_t")

    def __init__(self, cat_id, nombre):
        self.cat_id = cat_id
        self.nombre = nombre

class SubCategoria(db.Model): 
    __tablename__ = 'subcategoria'
    sub_cat_id = db.Column(db.String(50), primary_key = True, unique=True, nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    url_image = db.Column(db.String(300))
    categoria_id = db.Column(db.String(50), db.ForeignKey("categoria.cat_id"))
    tutorias = db.relationship("Tutoria", backref="subcategoria")

    def __init__(self, sub_cat_id, nombre, url_image, categoria_id):
        self.sub_cat_id = sub_cat_id
        self.nombre = nombre
        self.url_image = url_image
        self.categoria_id = categoria_id

class Tutoria(db.Model): 
    __tablename__ = 'tutoria'
    tutoria_id = db.Column(db.String(50), primary_key = True, unique=True, nullable=False)
    valor_ut = db.Column(db.String(50), nullable=False)
    descripcion = db.Column(db.String(50), nullable=False)
    nombre = db.Column(db.String(50), nullable=False)
    sub_categoria_id = db.Column(db.String(50), db.ForeignKey("subcategoria.sub_cat_id"))
    categoria_id = db.Column(db.String(50), db.ForeignKey("categoria.cat_id"))
    public_id = db.Column(db.String(50), db.ForeignKey("usuario.public_id"))
    calificacion = db.relationship("Calificacion", backref="tutoria")


    def __init__(self, tutoria_id, valor_ut, descripcion, nombre, sub_categoria_id, categoria_id, public_id):
        self.tutoria_id = tutoria_id
        self.valor_ut = valor_ut
        self.descripcion = descripcion
        self.nombre = nombre
        self.sub_categoria_id = sub_categoria_id
        self.categoria_id = categoria_id
        self.public_id = public_id

class Calificacion(db.Model): 
    __tablename__ = 'calificacion'
    calificacion_id = db.Column(db.String(50), primary_key = True, unique=True, nullable=False)
    calificacion = db.Column(db.Float, nullable=False)
    cantidad_resenas = db.Column(db.Integer, nullable=False)
    tutoria_id = db.Column(db.String(50), db.ForeignKey("tutoria.tutoria_id"))

    def __init__(self, calificacion_id, calificacion, cantidad_resenas, tutoria_id):
        self.calificacion_id = calificacion_id
        self.calificacion = calificacion
        self.cantidad_resenas = cantidad_resenas
        self.tutoria_id = tutoria_id

#Lee nuestras clases y crea las tablas en la base de datos
db.create_all()

#Schemas tablas
class UsuarioSchema(ma.SQLAlchemyAutoSchema):
    class Meta():
        model = Usuario
        load_instance = True
        load_only = ("usuario_id", "public_id")

class CategoriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta():
        model = Categoria
        load_instance = True

class SubCategoriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta():
        model = SubCategoria
        load_instance = True
        include_fk = True

class TutoriaSchema(ma.SQLAlchemyAutoSchema):
    class Meta():
        model = Tutoria
        load_instance = True
        include_fk = True

class CalificacionSchema(ma.SQLAlchemyAutoSchema):
    class Meta():
        model = Tutoria
        load_instance = True
        include_fk = True

#Generamos variables para obtener los schemas 
usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)


@app.route("/register", methods=["POST"])
def create_usuario():
    new_usuario = usuario_schema.load(request.json)
    if Usuario.query.filter_by(usuario_id = new_usuario.usuario_id).first() is not None:
      # existing user
      print("something")
    db.session.add(new_usuario)
    db.session.commit()
    return usuario_schema.dump(new_usuario) , 201

@app.route("/profile", methods=["POST"])
def profile():
    public_id = request.json["public_id"]
    data_user = Usuario.query.filter_by(public_id = public_id).first()
    return usuario_schema.dump(data_user), 200

@app.route("/profile/<string:public_id>", methods=["GET"])
def profile_tutor(public_id):
    data_user = Usuario.query.filter_by(public_id = public_id).first()
    return usuario_schema.dump(data_user), 200



if __name__ == "__main__":
    app.run(debug=True, port=4000)
