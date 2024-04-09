import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pcs from "./components/pc";
import Add from "./components/Add";
import Update from "./components/Update";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import InboxIcon from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  searchIcon: {
    marginRight: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      
      <Router>

      <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/add">Add PC</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/update">Update PC</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/delete">Delete PC</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/settings">Settings</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              My App
            </Typography>
            <IconButton color="inherit">
              <SearchIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
            </IconButton>
          </Toolbar>
        </AppBar>

        <div></div>

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            <ListItem button>
              <br></br>
              <br></br>
            </ListItem>
            <ListItem button>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add PC" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><EditIcon /></ListItemIcon>
              <ListItemText primary="Update PC" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><DeleteIcon /></ListItemIcon>
              <ListItemText primary="Delete PC" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SettingsIcon /></ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><AccountCircleIcon /></ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary="Mail" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><DraftsIcon /></ListItemIcon>
              <ListItemText primary="Drafts" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><InboxIcon /></ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary="Star" />
            </ListItem>
            <ListItem button>
              <ListItemIcon><SendIcon /></ListItemIcon>
              <ListItemText primary="Send" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <Routes>
            <Route path="/update/:id" element={<Update />} />
            <Route path="/add" element={<Add />} />
            <Route path="/" element={<Pcs />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
