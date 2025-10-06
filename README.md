# CMS

CMS (**Calls Managment System**) is a web-software used to fix the issue of *non-called*, *mistakenly called* or *too early called* dishes in resturant.

![NoPopUp](/assets/CMS-NoPopUp.png)

![popUp](/assets/CMS-popUp.png)

## How does it work

The CMS is a *client-server* system, this means that it is composed of some clients and a server, in our case the clients are the **kitchen** and the **pizzeria**, and the server is what hosts the program and controls the **HALF DUPLEX** communication between the two.<br>
It is a web-app, works with LAN WiFi or Ethernet and it is composed of 2 different web-sites, one for each client.

When a user opens up the website it is asked what type of user is it "**Kitchen (host)** or **"Pizzeria (Client)**" with the pop up that opens.

> [!CAUTION]
> In reality both the host and the client are hosts, but in different moments (Full Duplex Communication) and have different tasks.

## Host: Kitchen

The kitchen is the *main host*: When the user selects "Kitchen (Host)" the web server will open the HMW (**Host Managment Window**) which is composed of a set of all the tables in the resturant, each table can be of 3 colors:

- `#FF3131` - RED, The default value, when a table has <ins>NOT</ins> been called yet.
- `#7ED957` - GREEN, The table has been called, when the table is in this state, under the table number will appear a **chronometer**, which shows how much time ago the host called the table.
- `#5170FF` - BLUE, The table is currently selected, only when some operation are happening or will happen on the table.  

The main goal of the host is to **send calls**.

## Client: Pizzeria

The pizzeria is the *main client*: When the user selects "Pizzeria (Client)" the web server will open the CMW (**Client Managment Window**) which is composed of the same tables of the host.

The main difference between the client and the host is that, **the client can <ins>NOT</ins> send calls** and can not control a table, the main *host task* the client can do is **confirm that a table has been completed** and thus, the client can only operate on GREEN tables [(1)](IDEAS.md).

## V1 - JS BASED (05/05/2025)

The CMS-V1 is **JS Based**, this means that most of the backend and frontend logic is made with javaScript, this is done just because of the *short time* to make sure that the first version is up and running.

Also in this version the tables heve been written *manually* for the same reasons.

In the next version I'm planning to make all of the logic with **php**, since it is safer, more rubust and need less LOC to make more funcionalities.