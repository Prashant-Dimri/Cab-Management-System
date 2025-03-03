import psycopg2
def get_connection():
    try:
        connection=psycopg2.connect(dbname="First",user="postgres",
                                    password="020202",host="localhost",
                                    port="5432")
        return connection
    except Exception as e:
        print(f"Error connecting to database {e}")
        return None

        