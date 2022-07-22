import os

from flask import Flask, jsonify, request
from flask_restful import Api
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

from Resources.Wallets import Wallets

# FLASK
app = Flask(__name__)
app.secret_key = os.urandom(20)    
app.config['PROPAGATE_EXCEPTIONS'] = True       # To allow flask to display proper errors from JWT
api = Api(app)

jwt = JWTManager(app)


@app.route("/login", methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if username != os.environ.get("user") or password != os.environ.get("pw"):
        return jsonify({"msg": "Invalid username or password!"}), 401
    
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

api.add_resource(Wallets, '/wallets')
# api.add_resource(Wallets, '/wallet/')
# api.add_resource(Currency, '/currency')
# api.add_resource(Transaction, '/wallet/<string:name>/transaction')

# runs flask API
if __name__ == '__main__':
    app.run(debug=True)