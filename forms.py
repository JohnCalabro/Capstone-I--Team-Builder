from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, HiddenField
from wtforms.validators import InputRequired

class BuildForm(FlaskForm):
    pokename = StringField("Enter Pokemon Name", validators=[InputRequired()])

# class GhostForm(FlaskForm):
#     mon_one = HiddenField('testing')
#     mon_two = HiddenField('test2')

class UserForm(FlaskForm):
    username = StringField("Username", validators=[InputRequired()])
    password = PasswordField("Password", validators=[InputRequired()])