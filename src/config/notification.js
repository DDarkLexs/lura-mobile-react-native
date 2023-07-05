import PushNotification from 'react-native-push-notification';

// Configuração inicial
PushNotification.configure({
  // Configurações do provedor ou servidor personalizado
  // Consulte a documentação do provedor/servidor para obter as configurações corretas
  // Exemplo:
  onRegister: function (token) {
    // Registro bem-sucedido no servidor de notificações
    console.log('TOKEN:', token);
  },

  onNotification: function (notification) {
    // Manipulação de notificações recebidas
    console.log('NOTIFICATION:', notification);
  },
  // Restante das configurações...
});



