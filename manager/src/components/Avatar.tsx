import React from 'react';
import Auth from '../services/Auth';
import { Image } from 'react-bootstrap';

const AVATARS_API_PATH = "https://ui-avatars.com/api/?size=20&font-size=0.7&name=";

const Avatar: React.FC = () => {
  var {firebaseUser} = Auth;
  var path = (firebaseUser && firebaseUser.photoURL) || (AVATARS_API_PATH + firebaseUser.displayName);
  return (
    <Image src={path} width={18} height={18} roundedCircle /> 
  )
}

export default Avatar;