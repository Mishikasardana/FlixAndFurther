const dbConnection = require("../config/dbConfig.js");

const initDb = async () => {
  let connection;
  try {
    connection = await dbConnection();
    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Genre (
            gid NUMBER PRIMARY KEY,
            gname VARCHAR2(30)
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Movies (
            movid NUMBER PRIMARY KEY,
            title VARCHAR2(200),
            gid NUMBER,
            release_year NUMBER(4),
            language VARCHAR2(50),
            rating NUMBER(3, 1),
            description CLOB,
            CONSTRAINT fk_movies_genre FOREIGN KEY (gid) REFERENCES Genre(gid)
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Songs (
            sid NUMBER PRIMARY KEY,
            title VARCHAR2(50),
            movid NUMBER,
            singer VARCHAR2(60),
            CONSTRAINT fk_songs_movie FOREIGN KEY (movid) REFERENCES Movies(movid)
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Users (
            AID NUMBER PRIMARY KEY,
            name VARCHAR2(100) NOT NULL,
            email VARCHAR2(100) UNIQUE NOT NULL,
            password VARCHAR2(100),
            subscription_plan VARCHAR2(20),
            signup_date DATE DEFAULT SYSDATE,
            banking_details CLOB,
            phone_no VARCHAR2(20) UNIQUE NOT NULL
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE WatchHistory (
            AID NUMBER,
            movid NUMBER,
            watched_on DATE DEFAULT SYSDATE,
            action_type VARCHAR2(20) DEFAULT ''Played'',
            CONSTRAINT fk_watch_user FOREIGN KEY (AID) REFERENCES Users(AID),
            CONSTRAINT fk_watch_movie FOREIGN KEY (movid) REFERENCES Movies(movid),
            CONSTRAINT pk_watch PRIMARY KEY (AID, movid, watched_on)
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Recommendation (
            AID NUMBER,
            recommend VARCHAR2(60),
            CONSTRAINT fk_recommend_user FOREIGN KEY (AID) REFERENCES Users(AID)
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN RAISE; END IF;
      END;`);

    await connection.execute(`
        BEGIN
          EXECUTE IMMEDIATE '
            CREATE TABLE likes (
                AID INT,
                gid INT,
                PRIMARY KEY (AID, gid),
                FOREIGN KEY (AID) REFERENCES Users(AID),
                FOREIGN KEY (gid) REFERENCES Genre(gid)
            )';
        EXCEPTION
          WHEN OTHERS THEN
            IF SQLCODE != -955 THEN RAISE; END IF;
        END;`);

    console.log("✅ Oracle SQL database initialized successfully!");
  } catch (err) {
    console.error("❌ Error creating Oracle SQL tables:", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("❌ Error closing the database connection:", err);
      }
    }
  }
};

module.exports = initDb;
