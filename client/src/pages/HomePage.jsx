import { useState, useContext, useEffect } from "react"
import { api } from "@/services/api"
import { GlobalContext } from '@/context/GlobalContext';
import { useNavigate } from "react-router-dom"
import GroupCard from "@/components/GroupCard"
import MainWrapper from "@/components/MainWrapper"
import GroupCardSkeleton from "../components/skeletons/GroupCardSkeleton";

export default function HomePage() {

    const { search } = useContext(GlobalContext);
    const [groups, setGroups] = useState(null);

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
                {groups === null && ([...Array(6)].map((_, i) => (
                    <GroupCardSkeleton />
                )))}
                {groups?.map((group, i) => (
                    <GroupCard group={group} key={i} />
                ))}
            </div>
        </MainWrapper>
    )
}