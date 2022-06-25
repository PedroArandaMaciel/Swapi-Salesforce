({
    handleCreateContact: function (component, event, helper) {
        let fetchedApi = component.get('v.fetchedFromApi');
        if (fetchedApi) {
            component.set('v.fetchedFromApi', false);
            var saveContactAction = component.get("c.createContact");
            var separadoEnEspacios = component.get("v.Name").split(" ");
            let espacio = "";
            if (separadoEnEspacios.length >= 3) {
                espacio = " ";
            }
            if (separadoEnEspacios.length > 1) {
                var nombre = separadoEnEspacios[0];
                var apellido = separadoEnEspacios[1] + espacio + separadoEnEspacios[2];
                apellido = apellido.replace("undefined", "");
            } else {
                var apellido = component.get("v.Name");
            };
            var contact = helper.llenarContact(component, event, helper, nombre, apellido);
            saveContactAction.setParams({
                "contact": JSON.stringify(contact)
            });
            saveContactAction.setCallback(this, function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    helper.successContactCreated();
                }
                else if (state === "ERROR") {
                    helper.errorDuplicatedContact();
                }
                else {
                    helper.ErrorNoResponseServer();
                }
            });
            $A.enqueueAction(saveContactAction);
        } else {
            helper.ErrorOnliSaveApi();
        }
    },
    fetchCharacter: function (component, event, helper) {
        var selectedValue = component.find('codigoId').get('v.value');
        var action = component.get("c.getCharacter");
        action.setParams({
            'numeroPersonaje': selectedValue
        });
        action.setCallback(this, function (response) {
            var res = response.getState();
            if (res == 'SUCCESS') {
                helper.booleansSetTrue(component);
                var responseValues = JSON.parse(response.getReturnValue());
                if (responseValues == null) {
                    helper.ErrorNoExiste();
                }
                helper.setAtributosVista(component, event, helper, responseValues, selectedValue);
                helper.booleanIfSetFalse(component, event, helper, responseValues);
            }
        });
        $A.enqueueAction(action);
    },
})