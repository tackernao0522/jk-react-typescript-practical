type TodoType = {
    userId: number;
    title: string;
    completed?: boolean; // ?はあってもなくても良いという意味
};

export const Todo = (props: TodoType)    => {
    const { title, userId, completed = false } = props; // completedのデフォルト値をfalseにしている
    const completeMark = completed ? "[完]" : "[未]";
    return <p>{`${completeMark} ${title}(ユーザー: ${userId})`}</p>;
};
