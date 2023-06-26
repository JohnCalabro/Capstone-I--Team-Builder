from flask import Flask, render_template, redirect, session, flash, request, jsonify
from models import db, connect_db, User, UserTeam
from forms import BuildForm, UserForm

app =  Flask(__name__)


app.app_context().push()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///poke'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config['SECRET_KEY'] = "whatever123456"

connect_db(app)


@app.route('/teams')
def show_team():
    if "user_id" not in session:
        flash("You must be logged in to view teams")
        return redirect('/login')
    else:
        user = User.query.get(session['user_id'])
        return render_template('teams.html', user=user)

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

# @app.route('/pokemon')
# def view mon():

@app.route('/create', methods=["GET", "POST"])
def send_to_db():
    # mons = request.form.keys()

    if "user_id" not in session:
        return redirect('/login')
    else:
        users = User.query.all()
        # testing = soup.find_all("input", type="hidden")
        mons = request.form.values()
        
        test = request.form
        # print(test)

        
        
        
        
        team = {index : mon for index, mon in enumerate(mons)}

        # print(team[0], team[3])
    
        user_team = UserTeam(mon_one_id=team[0],mon_two_id=team[1],mon_three_id=team[2],mon_four_id=team[3],
        mon_five_id=team[4], mon_six_id=team[5], user_id=session["user_id"])

        db.session.add(user_team)
        db.session.commit()
        
        return render_template('test.html' , mons=mons)


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