import dayjs from "dayjs";
import prisma from "@server/utils/prisma.js";
import resend from "@server/utils/resend.js";

interface MailingPayload {
  userId: string;
  email: string;
  date: Date;
  description: string;
  sendAt?: Date;
}

export const createMailing = (payload: MailingPayload) => {
  return prisma.mailing.create({
    data: payload,
  });
};

export const getMailing = (id: string) => {
  return prisma.mailing.findUnique({
    where: {
      id,
    },
  });
};

export const getMailings = (userId: string, month?: number) => {
  const startOfMonth = month
    ? dayjs().month(month).startOf("month").toDate()
    : dayjs().startOf("month").toDate();
  const endOfMonth = month
    ? dayjs().month(month).endOf("month").toDate()
    : dayjs().endOf("month").toDate();

  return prisma.mailing.findMany({
    where: {
      userId,
      date: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
};

export const updateMailing = (id: string, payload: Partial<MailingPayload>) => {
  return prisma.mailing.update({
    where: {
      id,
    },
    data: payload,
  });
};

export const deleteMailing = (id: string) => {
  return prisma.mailing.delete({
    where: {
      id,
    },
  });
};

export const sendMail = async (email: string) => {
  const RESEND_SENDER_DOMAIN = process.env.RESEND_SENDER_DOMAIN as string;
  const { data, error } = await resend.emails.send({
    from: `noreply@${RESEND_SENDER_DOMAIN}`,
    to: [email],
    subject: "Test",
    html: "<p>Hi Salam kenal</p>",
  });

  return { data, error };
};
