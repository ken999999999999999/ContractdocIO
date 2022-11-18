import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useController, UseControllerProps } from 'react-hook-form';

interface IRichTextEditor extends ReactQuillProps {
  formProps: UseControllerProps<any>;
}

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'] // remove formatting button
];

export default ({ formProps, ...rest }: IRichTextEditor): JSX.Element => {
  const { field, fieldState } = useController(formProps);

  return (
    <>
      <ReactQuill
        style={{ border: fieldState.error ? '1px solid #d32f2f' : 'none' }}
        theme="snow"
        preserveWhitespace
        modules={{ toolbar: toolbarOptions }}
        {...field}
        {...rest}
      />
      {fieldState?.error && (
        <p
          style={{
            color: '#d32f2f',
            margin: '3px 14px 0 14px',
            fontSize: '0.75rem',
            fontWeight: '400'
          }}
        >
          {fieldState?.error?.message}
        </p>
      )}
    </>
  );
};
