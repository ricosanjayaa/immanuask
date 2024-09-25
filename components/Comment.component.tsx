import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Comment() {
  return (
    <div className="flex flex-row gap-4">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="text-sm">anonymoususeranjay <span className="text-muted-foreground">2 days ago</span></p>
        <p className="text-sm tracking-tight">This thing is so shit... not gonna lie</p>
      </div>
    </div>
  );
}