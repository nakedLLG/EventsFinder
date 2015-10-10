using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EventsFinder.Startup))]
namespace EventsFinder
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
