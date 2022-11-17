import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  DeleteWilderMutation,
  DeleteWilderMutationVariables,
  GetWildersQuery,
} from "../../gql/graphql";

import blankProfilePicture from "../../media/blank-profile-picture.png";
import { getErrorMessage } from "../../utils";
import CloseButton from "../CloseButton/CloseButton";
import Dialog from "../Dialog/Dialog";
import Skill from "../Skill/Skill";
import {
  Card,
  CardImage,
  CardParagraph,
  CardSecondaryTitle,
  CardSkillList,
  CardTitle,
} from "./Wilder.styled";

const DELETE_WILDERS = gql`
  mutation DeleteWilder($id: String!) {
    deleteWilder(id: $id) {
      id
      firstName
    }
  }
`;

type PropType = GetWildersQuery["wilders"][number] & {
  onDelete: () => void;
};

const Wilder = ({ id, firstName, lastName, skills, onDelete }: PropType) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteWilder] = useMutation<
    DeleteWilderMutation,
    DeleteWilderMutationVariables
  >(DELETE_WILDERS);

  const onCloseButtonClick = () => {
    setShowDeleteConfirmation(true);
  };

  const onDeleteConfirmation = async () => {
    try {
      await deleteWilder({ variables: { id } });
      toast.success(`Wilder ${firstName} ${lastName} supprimé avec succès.`);
      onDelete();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <Card>
      <CardImage src={blankProfilePicture} alt="Jane Doe Profile" />
      <CardTitle>
        {firstName} {lastName}
      </CardTitle>
      <CardParagraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </CardParagraph>
      <CardSecondaryTitle>Wild Skills</CardSecondaryTitle>
      <CardSkillList>
        {skills.map((skill) => (
          <li key={skill.id}>
            <Skill skillName={skill.skillName} numberOfVotes={1} />
          </li>
        ))}
      </CardSkillList>
      <CloseButton onClick={onCloseButtonClick} />
      {showDeleteConfirmation && (
        <Dialog
          onCancel={() => {
            setShowDeleteConfirmation(false);
          }}
          onConfirm={() => {
            setShowDeleteConfirmation(false);
            onDeleteConfirmation();
          }}
        />
      )}
    </Card>
  );
};

export default Wilder;
