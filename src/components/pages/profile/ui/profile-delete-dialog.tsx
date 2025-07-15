import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ProfileDeleteDialogProps = {
  children: React.ReactNode;
  onClick: () => void;
};

export function ProfileDeleteDialog({
  children,
  onClick,
}: ProfileDeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-[768px]:left-[calc(50%+100px)] min-[640px]:left-[calc(40%+100px)]   ">
        <DialogHeader>
          <DialogTitle className="text-red-600">Deletar perfil</DialogTitle>
          <DialogDescription>
            Tem certeza que deseja deletar seu perfil? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-org-d-green text-org-d-pessego hover:bg-green-900 hover:text-org-d-pessego cursor-pointer"
              variant="outline"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            className="bg-red-600 text-org-d-pessego hover:bg-red-950 hover:text-org-d-pessego cursor-pointer"
            type="submit"
            onClick={onClick}
          >
            Deletar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
