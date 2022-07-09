import axios from "axios";
import { useEffect, useState } from "react";
import { error, success } from "../utils/notification";
import copy from "copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import { SelectBox } from "./SelectBox";

export const TranslateBox = () => {
    const [q, setQ] = useState("");
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");
    const [output, setOutput] = useState("");

    const handleSelectChange = ({ target: { value, id } }) => {
        id === "source" && setSource(value);
        id === "target" && setTarget(value);
    }

    const handleGetRequest = async () => {
        if (source === "" || target === "") {
            try {
                let res = await axios.post("", { q, source: "nl", target: "en", format: "text" });
                res = res.data.translatedText;
                setOutput(res);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                let res = await axios.post("", { q, source, target, format: "text" });
                res = res.data.translatedText;
                setOutput(res);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const copyToClipboard = (text) => {
        copy(text);
        success("Gekopieerd")
    }

    const resetText = () => {
        if (q === "" && output === "") {
            error("Textbox is al leeg!")
        } else {
            success("Tekst verwijdert!")
            setQ("");
            setOutput("");
        }
    }

    useEffect(() => {
        let timerID = setTimeout(() => {
            handleGetRequest();
        }, 1000);
        return () => {
            clearTimeout(timerID);
        }
    }, [q]);

    return (
        <>
            <div className="mainBox">
                <div>
                    <SelectBox id={'source'} select={handleSelectChange} />
                    <div className="box">
                        <textarea autoFocus onChange={(e) => { setQ(e.target.value) }} value={q} className="outputResult"></textarea>
                    </div>
                    <div className="iconBox">
                        <FaCopy onClick={() => { copyToClipboard(q) }} className="icon" />
                        <MdClear onClick={resetText} className="icon" />
                    </div>
                </div>
                <div>
                    <SelectBox id={'target'} select={handleSelectChange} />
                    <div className="outputResult box">
                        <p id="output">{output}</p>
                    </div>
                    <div className="iconBox">
                        <FaCopy onClick={() => { copyToClipboard(output) }} className="icon" />
                        <BiTransfer onClick={handleGetRequest} className="icon" />
                    </div>
                </div>
            </div>
        </>
    );
};

