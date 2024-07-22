
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
function TodoItem({todo, fetchDetailsOfCurrentTodo}){
    return(
      <Card sx={{
        maxWidth: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between'
      }}>
        <CardContent>
            <Typography>
                {todo?.todo}
            </Typography>
        </CardContent>
        <CardActions>
            <Button
            onClick={()=> fetchDetailsOfCurrentTodo(todo?.id)}
             sx={{
                backgroundColor:'#000',
                color: '#fff',
                opacity: '0.45',
                '&:hover' : {
                    backgroundColor:'#000',
                    color: '#fff',
                    opacity: '1',
                },
            }}>
                Show Details
            </Button>
        </CardActions>
      </Card>
    )
}

export default TodoItem;