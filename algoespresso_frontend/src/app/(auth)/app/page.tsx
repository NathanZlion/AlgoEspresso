'use client'

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/axios";
import { useState } from "react";


export default function AuthenticatedUserPage() {
    const [responses, SetResponses] = useState<string[]>([]);

    const onButtonClick = async () => {
        const res = await apiClient.get("/problem/list")

        SetResponses(
            [
                ...responses,
                res.data
            ]
        )
    }

    return (
        <div>
            <main className="font-dotGothic">
                <h1>Dashboard</h1>
                <Button onClick={onButtonClick}> Fetch </Button>
                <ul>
                    {
                        responses.map((response, index) => {
                            return <li key={`repsonse list ${index}`}>{response}</li>;
                        })
                    }
                </ul>
            </main>
        </div >
    );
}
