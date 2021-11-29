const router = async () => {
    const routes = [
        {path: "/", view: () => console.log("Dashboard")},
        {path: "/reviews", view: () => console.log("Reviews")},
        {path: "/tutorial", view: () => console.log("Tutorial")}

    ];

    const potentialMatches = routes.map(route =>{
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    console.log(potentialMatches);
};

document.addEventListener("DOMContentLoad", () => {
    router();
});