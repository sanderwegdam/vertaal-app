export const SelectBox = ({ id, select }) => {
    return (
        <>
            <div className="select">
                <select id={id} onChange={select} defaultValue={'default'}>
                    <option value="default">Select Language</option>
                    <option value="nl">Nederlands</option>
                    <option value="en">Engels</option>
                    <option value="de">Duits</option>
                    <option value="fr">Frans</option>
                    <option value="es">Spaans</option>
                </select>
            </div>
        </>
    );
};