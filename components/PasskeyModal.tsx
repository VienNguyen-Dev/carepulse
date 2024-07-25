"use client";

import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");

  const setModal = () => {
    setOpen(false);
    router.push("/");
  };

  const encryptedKey = typeof window !== undefined ? localStorage.getItem("accessKey") : null;
  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const validatePassskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        //encypt passkey:
        const encryptedKey = encryptKey(passkey);
        localStorage.setItem("accessKey", encryptedKey);
        setOpen(false);
      } else {
        return setError("Invalid pass key. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-start justify-between">
              Admin Access Verification <Image src={"/assets/icons/close.svg"} width={24} height={24} alt="close-btn" onClick={() => setModal()} />
            </AlertDialogTitle>
            <AlertDialogDescription className=" text-dark-600">To access the admin page, please enter the passkey...</AlertDialogDescription>
          </AlertDialogHeader>
          {/* TODO verify Input */}
          <InputOTP maxLength={6} value={passkey} onChange={setPasskey}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className=" shad-error">{error}</p>}
          <AlertDialogFooter className="flex items-center">
            <AlertDialogAction onClick={(e) => validatePassskey(e)} className="shad-primary-btn w-full">
              Enter Admin Panel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PasskeyModal;
