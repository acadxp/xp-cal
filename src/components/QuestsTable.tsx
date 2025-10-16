import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Quest } from "../types/types";
import useStore from "../store/useStore";

function QuestsTable() {
  const quests: Quest[] = useStore((state) => state.quests);
  const addXP = useStore((state) => state.addXP);
  return (
    <Table className="border border-white/5 rounded-lg overflow-hidden bg-gradient-to-b from-gray-800/50 to-zinc-900/50 backdrop-blur-lg">
      <TableCaption className="text-zinc-400 mt-4">
        Complete quests to earn XP and level up!
      </TableCaption>
      <TableHeader>
        <TableRow className="border-white/5 hover:bg-white/5">
          <TableHead className="w-[100px] text-zinc-300">Quest ID</TableHead>
          <TableHead className="text-zinc-300">Name</TableHead>
          <TableHead className="text-zinc-300">XP Reward</TableHead>
          <TableHead className="text-right text-zinc-300">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quests.map((quest) => (
          <TableRow key={quest.id} className="border-white/5 hover:bg-white/5">
            <TableCell className="font-medium text-zinc-300">
              {quest.id}
            </TableCell>
            <TableCell className="text-zinc-400">{quest.name}</TableCell>
            <TableCell className="text-emerald-400 font-medium">
              +{quest.xpReward} XP
            </TableCell>
            <TableCell className="text-right">
              <Button
                onClick={() => addXP(quest.xpReward)}
                className="bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white hover:opacity-90 transition
                           shadow-[0_0_15px_rgba(168,85,247,0.25)] border-0"
              >
                Complete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default QuestsTable;
