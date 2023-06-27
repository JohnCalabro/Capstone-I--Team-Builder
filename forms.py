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

class EditForm(FlaskForm):
    one = StringField("Pokemon One", validators=[InputRequired()])
    two = StringField("Pokemon Two", validators=[InputRequired()])
    three = StringField("Pokemon Three", validators=[InputRequired()])
    four = StringField("Pokemon Four", validators=[InputRequired()])
    five = StringField("Pokemon Five", validators=[InputRequired()])
    six = StringField("Pokemon Six", validators=[InputRequired()])