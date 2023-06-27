from app import app
from unittest import TestCase


class StatusTestOk (TestCase):
    def testing_success(self):
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)
            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Welcome to Pokemon Team Builder!</h1>', html)
        


class StatusTestRedirect (TestCase):
    def testing_redirect(self):
        with app.test_client() as client:
            res = client.get('/build')
            # html = res.get_data(as_text=True)

            # expected 302 because it redirects if user not is session
            self.assertEqual(res.status_code, 302)

            # fails because of the redirect and no 200 code
            # self.assertIn('<h1>Pokemon Team Builder</h1>', html)


class StatusPost (TestCase):
    def testing_post(self):
        with app.test_client() as client:
            res = client.post('/team/1/delete')

            #test failed, 302 status happened first, because route redirects
            self.assertEqual(res.status_code, 200)

