public without sharing class ContactController {

    @AuraEnabled
    public static Contact createContact(String contact) {
        Contact c = (Contact)JSON.deserialize(contact, Contact.class);
        insert c;
        return c;
    }
    @AuraEnabled
    public static String getCharacter(Integer numeroPersonaje) {
        String starWarChar;
        List < Contact > characterFromDB=getCharacterFromDB(numeroPersonaje);
        if (!characterFromDB.isEmpty()) {
            starWarChar = String.valueOf(JSON.serialize(characterFromDB[0]));
        } else {
            starWarChar = getCharacterFromAPI(numeroPersonaje);
        }
        return starWarChar;
    }
    public static String getCharacterFromAPI(Integer numeroPersonaje) {
        String result = null;
        try {
            if (numeroPersonaje != null) {
                String APIUrl = 'https://swapi.dev/api/people/' + numeroPersonaje + '/?format=json';
                system.debug('APIUrl is ' + APIUrl);
                HttpRequest req = new HttpRequest();
                req.setMethod('GET');
                req.setEndpoint(APIURL);
                Http http = new Http();
                HttpResponse res = http.send(req);
                Integer statusCode = res.getStatusCode();
                system.debug('statusCode is ' + statusCode);
                if (statusCode == 200) {
                    system.debug('API invoked successfully');
                    result = res.getBody();
                }
            }
        }
        catch (exception e) {
            system.debug(e.getMessage());
        }
        return result;
    }
    public static List<Contact> getCharacterFromDB(Integer numeroPersonaje) {
        List < Contact > obj =[
            select 
            Id, Genero__c, Color_Cabello__c, Color_ojos__c, Planeta__c, firstName, Name, Altura__c, URL__c, Color_Piel__c from Contact
            WHERE
            Numero_Personaje__c =: numeroPersonaje
            LIMIT 1
        ];
        return obj;
    }
}