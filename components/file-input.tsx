export default function FileInput({handleFile}) {

    return (<input type="file" onChange={
        e => handleFile(e.target.files[0])
    } />)
}