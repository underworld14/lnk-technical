import { toast } from "sonner";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { mailSchema } from "@/schemas/mail.schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import DatePicker from "../ui/date-picker";
import { useCreateMail, useDeleteMail, useSendMail, useUpdateMail } from "@/queries/mail.query";

interface MutationMailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData?: Record<string, any>;
}

export default function MutationMail({ open, onOpenChange, editData }: MutationMailProps) {
  const form = useForm({
    resolver: yupResolver(mailSchema),
  });

  useEffect(() => {
    if (editData) {
      form.reset({
        email: editData.title,
        date: new Date(editData.date),
        description: editData.description,
      });
    }
  }, [editData]);

  const { mutate, isPending } = useCreateMail({
    onSuccess: () => {
      toast.success("Mail data created successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const { mutate: mutateUpdate, isPending: updateLoading } = useUpdateMail({
    onSuccess: () => {
      toast.success("Mail data updated successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const { mutate: mutateDelete, isPending: deleteLoading } = useDeleteMail({
    onSuccess: () => {
      toast.success("Mail data deleted successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const { mutate: sendMail, isPending: sendLoading } = useSendMail({
    onSuccess: () => {
      toast.success("Mail sent successfully");
      form.reset();
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (editData) {
      mutateUpdate({
        ...data,
        id: editData.id,
        date: data.date.toISOString(),
      });
    } else {
      mutate({
        ...data,
        date: data.date.toISOString(),
      });
    }
  });

  const handleDelete = (e: any) => {
    e.preventDefault();
    if (editData) {
      mutateDelete(editData.id);
    }
  };

  const handleSendMail = (e: any) => {
    e.preventDefault();
    if (editData) {
      sendMail(editData.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Mail</DialogTitle>
          <DialogDescription>
            You can create a new mail list here. Once created we will send an introduction email
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <DatePicker value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              {editData && (
                <Button variant="destructive" loading={deleteLoading} onClick={handleDelete}>
                  Delete
                </Button>
              )}
              <Button type="submit" loading={isPending || updateLoading}>
                {editData ? "Update" : "Create"}
              </Button>

              {editData && (
                <Button variant="secondary" onClick={handleSendMail} loading={sendLoading}>
                  Send Mail
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
