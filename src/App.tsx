import liff from "@line/liff/dist/lib";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Background as OriginBackground } from "./components/Background";
import { Button } from "./components/Button";
import { Forms } from "./components/Forms";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { MUISwitchButton } from "./components/MUISwitchButton";
import { Task } from "./components/Task";
import { useLiff } from "./hook/useLiff";
import { useTheme } from "./hook/useTheme";
import { Todo } from "./types/todo";

export const App = () => {
  const liffProfile = useLiff();

  const { theme, setTheme } = useTheme();

  const [mockTodoList, setMockTodoList] = useState<Todo[]>([]);

  // const [todoList, setTodoList] = useState<Todo[]>([]);

  const liffUser = useLiff();

  console.log(liffUser);

  const apiClient = axios.create({
    baseURL: "https://example.com/",
  });

  const {
    trigger,
    getValues,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    title: string;
    description: string;
  }>();

  const getTodoList = async () => {
    // const res = await apiClient.get<Todo[]>("/");
    // setTodoList(res.data);
    console.log("get");
  };

  const addTodo = async (todo: Todo) => {
    // const res = await apiClient.post<Todo[]>("/", {
    //   todo,
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(mockTodoList.concat([todo]));
  };

  const deleteTodo = async (id: string) => {
    // const res = await apiClient.delete<Todo[]>("/", {
    //   params: {
    //     id,
    //   },
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(mockTodoList.filter((todo) => todo.Id !== id));
  };

  const finishTodo = async (id: string) => {
    // const res = await apiClient.put<Todo[]>("/", {
    //   params: {
    //     id,
    //   },
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(
      mockTodoList.map((todo) =>
        todo.Id === id ? { ...todo, isFinished: true } : todo
      )
    );
  };

  const revertFinishTodo = async (id: string) => {
    // const res = await apiClient.put<Todo[]>("/", {
    //   params: {
    //     id,
    //   },
    // });
    // setTodoList(res.data);

    // Test
    setMockTodoList(
      mockTodoList.map((todo) =>
        todo.Id === id ? { ...todo, isFinished: false } : todo
      )
    );
  };

  const store = async () => {
    const triggerResult = await trigger();
    if (!triggerResult) return;

    const user = await liff.getProfile();

    // Test
    if (errors) {
      const data: Todo = {
        Id: Math.random().toString(32).substring(2),
        UserId: user.userId,
        Title: getValues("title"),
        Description: getValues("description"),
        isFinished: false,
        CreatedAt: Date.now().toString(),
        UpdatedAt: Date.now().toString(),
      };

      await addTodo(data);
      reset({
        title: "",
        description: "",
      });
    }
  };

  return (
    <Layout>
      <Background>
        <Header
          userName={liffProfile.userName}
          button={
            <MUISwitchButton
              checked={theme === "dark"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          }
        />
        <div>
          <Forms register={register} errors={errors} />
          <Button onClick={store}>ADD</Button>
        </div>
        <div>
          <h2>Task</h2>
          <ul>
            {mockTodoList.length ? (
              <>
                {mockTodoList.map(
                  ({ Id, Title, Description, isFinished }, index) => (
                    <>
                      {!isFinished && (
                        <Task
                          key={index}
                          onClick={() => finishTodo(Id)}
                          onClickTrash={() => deleteTodo(Id)}
                          title={Title}
                          description={Description}
                          isFinished={false}
                        />
                      )}
                    </>
                  )
                )}
              </>
            ) : (
              <li className="nothing">Nothing</li>
            )}
          </ul>
        </div>
        <div>
          <h2>Finished Task</h2>
          <ul>
            {mockTodoList.length ? (
              <>
                {mockTodoList.map(
                  ({ Id, Title, Description, isFinished }, index) => (
                    <>
                      {isFinished && (
                        <Task
                          key={index}
                          onClick={() => revertFinishTodo(Id)}
                          onClickTrash={() => deleteTodo(Id)}
                          title={Title}
                          description={Description}
                          isFinished={true}
                        />
                      )}
                    </>
                  )
                )}
              </>
            ) : (
              <li className="nothing">Nothing</li>
            )}
          </ul>
        </div>
      </Background>
    </Layout>
  );
};

const Background = styled(OriginBackground)`
  h2 {
    color: ${({ theme }) => theme.colors.font};
  }

  & > div:nth-child(2) {
    display: flex;
    flex-direction: row;
    gap: 10px;

    @media screen and (max-width: 959px) {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  & > div:nth-child(3),
  & > div:nth-child(4) {
    display: flex;
    flex-direction: column;
    gap: 15px;

    ul {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .nothing {
        font-size: 25px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.background};
      }
    }
  }
`;

const Style = styled.main`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  .contents {
    margin: 30px 0 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    color: ${({ theme }) => theme.colors.font};

    .add {
      display: flex;
      gap: 15px;
      width: 100%;
    }

    .not-finished {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 18px;
      gap: 10px;
      list-style: none;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.form};

        .content {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .trash {
          cursor: pointer;
          svg {
            height: 20px;
            fill: ${({ theme }) => theme.colors.font};
            :hover {
              fill: ${({ theme }) => theme.colors.warning};
            }
          }
        }
      }
    }

    .finished-title {
    }

    .not-finished {
      display: flex;
      flex-direction: column;
      font-size: 15px;
      line-height: 18px;
      gap: 10px;
      list-style: none;
      padding: 0;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 7px;
        padding: 10px;
        background-color: ${({ theme }) => theme.colors.form};

        .trash {
          cursor: pointer;
          svg {
            height: 20px;
            fill: ${({ theme }) => theme.colors.font};
            :hover {
              fill: ${({ theme }) => theme.colors.warning};
            }
          }
        }
      }
    }

    @media screen and (max-width: 640px) {
      padding: 0 20px 0;
    }

    @media (min-width: 640px) {
      padding: 0 48px 0;
    }
  }
`;
