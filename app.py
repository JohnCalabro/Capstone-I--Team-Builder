from flask import Flask, render_template, redirect, session, flash, request, jsonify
from models import db, connect_db, User, UserTeam
from forms import BuildForm, UserForm
import requests
import json


app =  Flask(__name__)


app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///poke'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['SECRET_KEY'] = "whatever123456"

connect_db(app)

@app.route('/')
def home_page():
    return render_template('home.html')

@app.route('/teams')
def show_team():
    if "user_id" not in session:
        flash("You must be logged in to view teams")
        return redirect('/login')
    else:
        user = User.query.get(session['user_id'])
        uTeams = user.userteams
        return render_template('teams.html', user=user, teams=uTeams)

@app.route('/register', methods=["GET","POST"])
def add_new_user():
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.register(username, password)
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        flash("Team Successfully Created!")
        return redirect('/teams')
    return render_template('register.html', form=form)


@app.route('/login', methods=["GET","POST"])
def login():
    form = UserForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        logged_user = User.authenticate(username, password)

        if logged_user:
            session["user_id"] = logged_user.id
            return redirect('/teams')
        else:
            print('odd')
            form.username.errors = ['Invalid username or password!']

    return render_template('login.html', form=form)


@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/login')


@app.route('/build')
def test():

    if "user_id" not in session:
        return redirect('/login')
    else:
        form = BuildForm()
        return render_template('index.html' , form=form)

@app.route('/create', methods=["GET", "POST"])
def send_to_db():
   

    if "user_id" not in session:
        return redirect('/login')
    else:
        users = User.query.all()
        
        mons = request.form.values()
            
        u = User.query.get(session["user_id"])

        if len(u.userteams) > 6:
            flash("You have reached the limit!")
            return redirect('/teams')
        
        
        team = {index : mon for index, mon in enumerate(mons)}

        user_team = UserTeam(mon_one_id=team[0],mon_two_id=team[1],mon_three_id=team[2],mon_four_id=team[3],
        mon_five_id=team[4], mon_six_id=team[5], user_id=session["user_id"])

        db.session.add(user_team)
        db.session.commit()
        
        return redirect('/teams')
        


@app.route('/api/userteams')
def list_team():
    all_mons = [mon.serialize() for mon in UserTeam.query.all()]
    return jsonify(teams=all_mons)


@app.route('/api/userteams/<int:id>')
def get_team(id):
    user = User.query.get_or_404(id)
    teams = user.userteams
    all_mons = [mon.serialize() for mon in teams]
    return jsonify(teams=all_mons)

@app.route('/remove')
def display_del_page():
    return render_template('remove.html')

@app.route('/user/delete', methods=["POST"])
def remove_user():
    if "user_id" not in session:
        flash("You can't catch another trainer's Pokemon and you can't delete another account!")
        return redirect('/teams')
    else:
        u = User.query.get(session["user_id"])
        db.session.delete(u)
        session.pop('user_id')
        db.session.commit()
        return redirect('/register')

@app.route('/team/<int:team_id>')
def show_single_team(team_id):
    
    t = UserTeam.query.get(team_id)
    
    return render_template('details.html', t=t)

@app.route('/team/<int:team_id>/delete', methods=["POST"])
def removeTeam(team_id):
    team = UserTeam.query.get(team_id)
    db.session.delete(team)
    db.session.commit()
    return redirect('/teams')



  
    
    
    
    



