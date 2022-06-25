({
    llenarContact: function (component, event, helper, nombre, apellido) {
        let contact = {
            contact: {
                Color_Piel__c: component.get("v.ColorPiel"),
                Color_Ojos__c: component.get("v.ColorOjos"),
                Color_Cabello__c: component.get("v.ColorCabello"),
                Altura__c: component.get("v.Altura"),
                FirstName: (nombre),
                LastName: (apellido),
                Genero__c: component.get("v.Genero"),
                Planeta__c: component.get("v.Planeta"),
                URL__c: component.get("v.URL"),
                numero_Personaje__c: component.get("v.NumeroPersonaje")
            }
        }
        return contact;
    },
    booleansSetTrue: function (component, event, helper) {
        let booleansTrue = ["v.NameBoolean",
            "v.GeneroBoolean",
            "v.ColorCabelloBoolean",
            "v.ColorPielBoolean",
            "v.ColorOjosBolean",
            "v.AlturaBoolean",
            "v.PlanetaBoolean",
            "v.URLBoolean"]
        for (let b = 0; b < 8; b++) {
            component.set(booleansTrue[b], true);
        }
    },
    setAtributosVista: function (component, event, helper, responseValues, selectedValue) {
        component.set('v.Name', (responseValues.Name || responseValues.name))
        component.set('v.Genero', (responseValues.Genero__c || responseValues.gender))
        component.set('v.ColorCabello', (responseValues.Color_Cabello__c || responseValues.hair_color))
        component.set('v.ColorPiel', (responseValues.Color_Piel__c || responseValues.skin_color))
        component.set('v.ColorOjos', (responseValues.Color_Ojos__c || responseValues.eye_color))
        component.set('v.Altura', (responseValues.Altura__c || responseValues.height))
        component.set('v.Planeta', (responseValues.Planeta__c || responseValues.homeworld))
        component.set('v.URL', (responseValues.URL__c || responseValues.url))
        component.set('v.NumeroPersonaje', selectedValue)
        if(responseValues.Name == null){
            component.set('v.fetchedFromApi', true)
        }
    },
    booleanIfSetFalse: function (component, event, helper, responseValues) {
        let datosApi = [responseValues.name,
        responseValues.gender,
        responseValues.hair_color,
        responseValues.skin_color,
        responseValues.eye_color,
        responseValues.height,
        responseValues.homeworld,
        responseValues.url
        ];
        let datosDb = [responseValues.Name,
        responseValues.Genero__c,
        responseValues.Color_Cabello__c,
        responseValues.Color_Piel__c,
        responseValues.Color_Ojos__c,
        responseValues.Altura__c,
        responseValues.Planeta__c,
        responseValues.URL__c
        ];
        let booleansFalse = ["v.NameBoolean",
            "v.GeneroBoolean",
            "v.ColorCabelloBoolean",
            "v.ColorPielBoolean",
            "v.ColorOjosBolean",
            "v.AlturaBoolean",
            "v.PlanetaBoolean",
            "v.URLBoolean"
        ];
        for (var valor = 0; valor < 8; valor++) {
            if ((datosApi[valor] || datosDb[valor]) == "n/a") {
                component.set(booleansFalse[valor], false);
            }
        }
    },
    ErrorNoExiste: function () {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Does Not Exist",
            "message": "Please enter other number",
            "key": 'info_alt',
            "type": 'info',
        });
        toastEvent.fire();
        return toastEvent;
    },
    ErrorOnliSaveApi: function () {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "error",
            "title": "Error! No Api contact",
            "message": "You can only save API contacts",
            "key": "error"
        });
        toastEvent.fire();
    },
    ErrorNoResponseServer: function () {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "error",
            "title": "Error! Refresh Windows",
            "message": "No response from server",
            "key": "error"
        });
        toastEvent.fire();
    },
    errorDuplicatedContact: function () {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "error",
            "title": "Error!",
            "message": "Duplicated contact",
            "key": "error"
        });
        toastEvent.fire();
    },
    successContactCreated: function () {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type": "success",
            "title": "Success!",
            "message": "Contact created successfully",
            "key": "success"
        });
        toastEvent.fire();
    },
})