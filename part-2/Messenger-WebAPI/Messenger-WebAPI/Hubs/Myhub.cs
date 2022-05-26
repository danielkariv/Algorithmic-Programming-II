using Microsoft.AspNetCore.SignalR;

namespace Messenger_WebAPI.Hubs
{

    
    public class Myhub : Hub
    {

     //   private readonly IDictionary<string, string> _connections;
        public Myhub()
        {
            //_connections = c;
        }
        public async Task join(string name)
        {
         //   _connections[name] = Context.ConnectionId;
        }
        public async Task Changed(string value)
        {
            await Clients.All.SendAsync("ChangeReceived,value");
        }
    }
}
