import { useState, useContext, useEffect } from "react"
import { api } from "@/services/api"
import { GlobalContext } from '@/context/GlobalContext';
import { useNavigate } from "react-router-dom"
import GroupCard from "@/components/GroupCard"
import MainWrapper from "@/components/MainWrapper"

export default function HomePage() {

    const { search } = useContext(GlobalContext);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const res = await api.getGroups({ search: search });
            setGroups(res);
        }
        fetchGroups();
        console.log(search);
    }, [search])

    return (
        <MainWrapper>
            <div className="mx-auto max-w-2xl space-y-4">
                {groups.map((group, i) => (
                    <GroupCard group={group} key={i} />
                ))}
            </div>
        </MainWrapper>
    )
}