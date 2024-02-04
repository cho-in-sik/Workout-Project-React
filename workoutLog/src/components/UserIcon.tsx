import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function UserIcon() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = async () => {
    const ok = confirm('Are you sure you want to log out?');
    if (ok) {
      auth.signOut();
      navigate('/');
    }
  };

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {/* <AccountCircle /> */}

        <Avatar alt="User Avatar" src={user?.photoURL} />
      </IconButton>
      <Menu
        sx={{}}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 50,
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link
            to={'/profile'}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            &nbsp;Profile&nbsp;
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            to={'/about'}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            &nbsp;About&nbsp;
          </Link>
        </MenuItem>
        <MenuItem onClick={onLogOut}>&nbsp;로그아웃&nbsp;</MenuItem>
      </Menu>
    </div>
  );
}
