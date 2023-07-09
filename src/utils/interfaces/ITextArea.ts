export interface ITextArea {
    value: string;
    handleChange: (newValue: string) => void;
    title: string;
    placeholder?: string;
}