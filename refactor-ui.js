const fs = require('fs');

const imports = `import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Select as ShadcnSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
    DropdownMenu as ShadcnDropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// ─── Shadcn Wrappers ────────────────────────────────────────────────────────
function Select({ value, onChange, options, placeholder, className = "", id }: any) {
    return (
        <ShadcnSelect value={value} onValueChange={onChange}>
            <SelectTrigger className={className} id={id}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option: any) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadcnSelect>
    )
}

function Modal({ isOpen, onClose, children, maxWidth = "md" }: any) {
    if (!isOpen) return null;
    const maxWidths: any = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-lg", xl: "max-w-xl", "4xl": "max-w-4xl" };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className={\`\${maxWidths[maxWidth]} p-0 overflow-hidden max-h-[90vh] flex flex-col border border-slate-200\`}>
                <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}

function DropdownMenu({ trigger, children }: any) {
    return (
        <ShadcnDropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="cursor-pointer inline-block">{trigger}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                {children}
            </DropdownMenuContent>
        </ShadcnDropdownMenu>
    )
}

function DropdownItem({ children, onClick, className = "", disabled, danger }: any) {
    return (
        <DropdownMenuItem onClick={onClick} disabled={disabled} className={\`\${className} \${danger ? "text-red-600 focus:text-red-600 focus:bg-red-50" : "text-slate-700"} cursor-pointer\`}>
            {children}
        </DropdownMenuItem>
    )
}

function DropdownLabel({ children }: any) {
    return <DropdownMenuLabel className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">{children}</DropdownMenuLabel>
}

function DropdownSeparator() {
    return <DropdownMenuSeparator className="bg-slate-200 my-1" />
}
`;

function replaceBlock(file, startStr, endStr, newBlock) {
    let content = fs.readFileSync(file, 'utf8');

    // Check if we need to add imports to the top
    if (!content.includes('@/components/ui/button')) {
        content = content.replace('// ─── Types', imports + '\n\n// ─── Types');
    }

    const startIndex = content.indexOf(startStr);
    const endIndex = content.indexOf(endStr, startIndex);

    if (startIndex !== -1 && endIndex !== -1) {
        const fullEndIndex = endIndex + endStr.length;
        content = content.substring(0, startIndex) + startStr + '\n' + newBlock + '\n\n' + content.substring(fullEndIndex);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    } else {
        console.log('Could not find bounds in ' + file);
    }
}

const userFile = 'c:/Cakli/cakli-frontend/app/operation-admin/users/page.tsx';
replaceBlock(
    userFile,
    '// ─── Native UI Components ───────────────────────────────────────────────',
    'function DropdownSeparator() {\r\n    return <div className="h-px bg-slate-200 my-1" />\r\n}\r\n',
    '// Native components have been replaced by Shadcn UI equivalents above.'
);

const ordersFile = 'c:/Cakli/cakli-frontend/app/operation-admin/orders/page.tsx';
replaceBlock(
    ordersFile,
    '// ─── Native UI Components ─────────────────────────────────────────────────────',
    'function DropdownSeparator() {\r\n    return <div className="h-px bg-slate-200 my-1" />\r\n}\r\n',
    '// Native components have been replaced by Shadcn UI equivalents above.'
);
