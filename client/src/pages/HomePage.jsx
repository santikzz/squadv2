import { useState, useContext, useEffect } from "react"
import { api } from "@/services/api"
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from "react-router-dom"
import GroupCard from "@/components/GroupCard"
import MainWrapper from "../components/MainWrapper"

export default function HomePage() {

    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await api.getGroups();
            setGroups(res);
        }
        fetchGroups();
    }, [])

    return (
        <MainWrapper>
            <div className="mx-auto max-w-2xl space-y-4">
                    {groups.map((group, i) => (
                        <GroupCard group={group} key={i} />
                    ))}
                {/* {[...Array(5)].map((_, i) => (
                ))} */}
            </div>
        </MainWrapper>
    )
}