import { Request, Response } from "express";
import {
  createMailing,
  getMailing,
  getMailings,
  deleteMailing,
  updateMailing,
  sendMail,
} from "@server/services/mail.service.js";
import { AppError } from "@server/utils/error.js";

export const createMailingController = async (req: Request, res: Response) => {
  const { email, date, description } = req.body;
  const userId = req.user?.userId as string;

  const mailing = await createMailing({
    userId,
    email,
    date: new Date(date),
    description,
  });

  return res.status(201).json({
    status: "success",
    data: mailing,
  });
};

export const getMailingController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const mailing = await getMailing(id);

  return res.status(200).json({
    status: "success",
    data: mailing,
  });
};

export const getMailingsController = async (req: Request, res: Response) => {
  const { month } = req.query;
  const userId = req.user?.userId as string;

  const mailings = await getMailings(userId, Number(month));

  return res.status(200).json({
    status: "success",
    data: mailings,
  });
};

export const updateMailingController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, date, description } = req.body;

  const mailing = await updateMailing(id, {
    email,
    date: new Date(date),
    description,
  });

  return res.status(200).json({
    status: "success",
    data: mailing,
  });
};

export const deleteMailingController = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteMailing(id);

  return res.status(204).json();
};

export const sendMailController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const mailing = await getMailing(id);

  if (!mailing) {
    throw new AppError("Mailing not found", 404);
  }

  const { data, error } = await sendMail(mailing.email);

  if (error) {
    throw new AppError(error.message, 500);
  }

  await updateMailing(id, {
    sendAt: new Date(),
  });

  return res.status(200).json({
    status: "success",
    data,
  });
};
