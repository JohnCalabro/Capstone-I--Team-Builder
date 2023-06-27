from flask import Flask, render_template, redirect, session, flash, request, jsonify
from models import db, connect_db, User, UserTeam
from forms import BuildForm, UserForm, EditForm
import requests
import json


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

        
        u = User.query.get(session["user_id"])

        if len(u.userteams) > 6:
            flash("You have reached the limit!")
            return redirect('/teams')
        
        
        team = {index : mon for index, mon in enumerate(mons)}

        # print(team[0], team[3])
    
        user_team = UserTeam(mon_one_id=team[0],mon_two_id=team[1],mon_three_id=team[2],mon_four_id=team[3],
        mon_five_id=team[4], mon_six_id=team[5], user_id=session["user_id"])

        db.session.add(user_team)
        db.session.commit()
        
        return redirect('/teams')
        # return render_template('test.html' , mons=mons)


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

@app.route('/team/<int:team_id>', methods=["GET", "POST"])
def editTeam(team_id):

    team = UserTeam.query.get(team_id)
    form = EditForm(obj=team)

    
    BASE_URL = 'https://pokeapi.co/api/v2/pokemon/${m}'
    

    BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

    response = requests.get(f"{BASE_URL}/97")
    # print(response.json()['id'])

    if form.validate_on_submit():
        BASE_URL = 'https://pokeapi.co/api/v2/pokemon'
        # response = requests.get(f"{BASE_URL}/97")
        # print(response.json()['name'])
        # pokName = response.json()['name']
        
        # pokeID = response.json()['id']

        team.mon_one_id = form.one.data
        team.mon_two_id = form.two.data
        team.mon_three_id = form.three.data
        team.mon_four_id = form.four.data
        team.mon_five_id = form.five.data
        team.mon_six_id = form.six.data

        
        
        compre = [v for v in form.data.items()]
        print(compre, 'COMPRE!!')
        for k,v in form.data.items():
            li = []
            res = requests.get(f"{BASE_URL}/{v}")
            li.append(res)
            print([res][0], 'I am here')
            print(li)
            
        
            
            
            txt = requests.get(f"{BASE_URL}/{v}").text
        # print(li, 'stubborn pc')
            
            # print(j['data'])

        
            
            # if v in txt:
            #     print(v)
            #     # v = pokeID
            #     print(v)



            

           
            

            
            # print(pokeID)
            
            

            # res = response.json()
            # print(v in res)
            
            # if v in response:
            #     print(v)
            #     pokeID = response.json()['id']
            #     v = pokeID




        # BASE_URL = 'https://pokeapi.co/api/v2/pokemon'

        # response = requests.get(f"{BASE_URL}/97")
        # print(response.json())
        


        # db.session.commit()


     
        return redirect(f"/team/{team_id}")
    else:
        return render_template('details.html', t=team, form=form)





# @app.route('/team/<int:team_id>')
# def show_single_team(team_id):
    
#     t = UserTeam.query.get(team_id)
#     form = EditForm(obj=t)
#     return render_template('details.html', t=t, form=form)

@app.route('/team/<int:team_id>/delete', methods=["POST"])
def removeTeam(team_id):
    team = UserTeam.query.get(team_id)
    db.session.delete(team)
    db.session.commit()
    return redirect('/teams')



  
    
    
    
    



