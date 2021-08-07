/* eslint-disable no-unused-vars */
import express from 'express';
import { UserType } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      user?: UserType
    }
  }
}
