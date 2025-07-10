WICHTIGE ZUSATZINFORMATIONEN 

Kurzanleitung zum Starten des Projekts:
1. Voraussetzungen:
   - mind. Java 17 (besser 21)
   - Node.js bzw. npm (v18 oder höher)
   - MySQL Server (Mit Nutzernamen, Passwort und Zugriff auf Port 3306)
2. MySQL Datenbank erstellen (mit dem Namen ghostnets_db)
4. Backend konfigurieren:
   - In der Datei src/main/resources/application.properties Nutzernamen und Passwort für MySQL anpassen
5. Backend starten:
   - Im Projektordner zu shea-sepherd-backend/ghostnets navigieren
   - dann ./mvnw spring-boot:run (bzw. mvnw.cmd spring-boot:run auf Windows)
6. Frontend starten:
   - Im Projektorder zu shea-sepherd-frontend navigieren
   - dann npm install und npm run dev
7. Ports überprüfen: Frontend läuft unter localhost:5173, Backend muss unter localhost:8080 laufen
8. HINWEISE:
   - Im Backend wurde eine Datei data.sql erstellt, die einen Datensatz zum Testen der Anwendung bereitstellt. Der Datensatz wurde mit einer KI erstellt,
     jedoch nur auf Funktionalität und nicht auf Plausibilität geprüft (Manche Netze befinden sich z.B. an Land) 
   - Im Zuge dessen stimmt die Datei application.properties nicht mit der Darstellung in der Hausarbeit überein! Damit der Datensatz auch beim Start des
     Programms geladen wird, wurden folgende Zeilen abegändert oder ergänzt:
     - spring.jpa.hibernate.ddl-auto=create
     - spring.sql.init.mode=always
     - spring.jpa.defer-datasource-initialization=true
   - create anstelle von update sorgt nun dafür, dass die Datenbank bei jedem Start der Anwendung geleert und frisch befüllt wird. Dies entspricht natürlich
    nicht einer persistenten Datenhaltung, erschien jedoch zu Testzwecken sinnvoll. 
