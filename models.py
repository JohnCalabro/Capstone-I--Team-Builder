from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt


db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    db.app= app
    db.init_app(app)

class User(db.Model):

    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.Text, nullable=False)
    password = db.Column(db.Text, nullable=False)

    @classmethod
    def register(cls, username, password):
        """Register user w with hashed password & return user."""
        hashed = bcrypt.generate_password_hash(password)
      
        hashed_utf8 = hashed.decode("utf8")

       
        return cls(username=username, password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, password):
        """Check if user exists & password is correct.
        
        
        """

        found_user = User.query.filter_by(username=username).first()

        if found_user and bcrypt.check_password_hash(found_user.password, password):
            
            return found_user
        else:
            return False


class UserTeam(db.Model):

    __tablename__ = 'userteams'
    
    team_id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    mon_one_id = db.Column(db.Integer, nullable=False)
    mon_two_id = db.Column(db.Integer)
    mon_three_id = db.Column(db.Integer)
    mon_four_id = db.Column(db.Integer)
    mon_five_id = db.Column(db.Integer) 
    mon_six_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE')) 

    teams = db.relationship("User", backref="userteams")

    def serialize(self):
        return {
            'team_id' : self.team_id,
            'mon_one_id' : self.mon_one_id,
            'mon_two_id' : self.mon_two_id,
            'mon_three_id' : self.mon_three_id,
            'mon_four_id' : self.mon_four_id,
            'mon_five_id' : self.mon_five_id,
            'mon_six_id' : self.mon_six_id,
            'user_id'  : self.user_id
        }












