using Microsoft.AspNetCore.SignalR;

namespace HubForProject.Hubs
{
    public class MyHub :Hub
    {
        //will map the connectionid by name
          private readonly IDictionary<string, string> _connections;
        public MyHub(IDictionary<string, string> c)
        {
            _connections = c;
        }
        //adding to the map
        public async Task join(string name)
        {
          
            _connections[name] = Context.ConnectionId;
          //  await Clients.All.SendAsync("Printmsg", _connections[name]);
        }

        //sending update to the the right connection
        public async Task Update(string name)
        {
            try
            {
                await Clients.Client(_connections[name]).SendAsync("Update" );
            }
            catch (Exception e)
            {

            }
        }
        public async Task Changed(string value)
        {
            await Clients.All.SendAsync("ChangeReceived,value");
        }
    }
}
